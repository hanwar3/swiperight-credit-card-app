import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Target, TrendingUp, Star, Gift, ExternalLink } from 'lucide-react';
import backend from '~backend/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import type { CardRecommendation } from '~backend/cards/recommend';

const popularCategories = [
  'Groceries', 'Gas', 'Dining', 'Travel', 'Shopping', 'Streaming'
];

export default function Recommendations() {
  const [category, setCategory] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const { user } = useAuth();

  const { data: recommendationsData, isLoading } = useQuery({
    queryKey: ['recommendations', category, user?.userId],
    queryFn: () => backend.cards.recommend({ 
      category, 
      userId: user?.userId 
    }),
    enabled: searchTriggered && category.length > 0,
  });

  const { data: merchantOffersData } = useQuery({
    queryKey: ['merchant-offers', user?.userId, category],
    queryFn: () => user ? backend.cards.getRelevantOffers({ 
      userId: user.userId, 
      category 
    }) : null,
    enabled: !!user && searchTriggered && category.length > 0,
  });

  const handleSearch = () => {
    if (category.trim()) {
      setSearchTriggered(true);
    }
  };

  const handleCategoryClick = (cat: string) => {
    setCategory(cat);
    setSearchTriggered(true);
  };

  const allRecommendations = recommendationsData?.cards || [];
  const portfolioRecommendations = recommendationsData?.portfolioRecommendations || [];
  const merchantOffers = merchantOffersData?.offers || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
          <Target className="h-4 w-4" />
          <span>Smart Recommendations</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">
          Find Your Perfect
          <span className="block bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
            Cashback Card
          </span>
        </h1>
        
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tell us what you're buying and we'll recommend the best credit cards to maximize your rewards.
        </p>
      </div>

      {/* Search */}
      <div className="space-y-4">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="What are you buying? (e.g., groceries, gas, dining)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          <Button 
            onClick={handleSearch}
            disabled={!category.trim()}
            className="bg-teal-500 hover:bg-teal-600"
          >
            Find Cards
          </Button>
        </div>

        {/* Popular Categories */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Popular categories:</p>
          <div className="flex flex-wrap gap-2">
            {popularCategories.map((cat) => (
              <Button
                key={cat}
                variant="outline"
                size="sm"
                onClick={() => handleCategoryClick(cat)}
                className="hover:bg-teal-50 hover:border-teal-300"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
            <p className="mt-2 text-gray-600">Finding the best cards for you...</p>
          </div>
        </div>
      )}

      {/* Results */}
      {searchTriggered && !isLoading && allRecommendations.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Best Cards for {recommendationsData?.category}
            </h2>
            <p className="text-gray-600">Ranked by cashback rate and value</p>
          </div>

          {/* Merchant Offers */}
          {merchantOffers.length > 0 && (
            <Card className="border-0 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Gift className="h-5 w-5 text-orange-600" />
                  <h3 className="font-semibold text-orange-900">Special Merchant Offers</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {merchantOffers.slice(0, 3).map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{offer.merchantName}</span>
                        <Badge className="bg-orange-100 text-orange-700">{offer.cardName}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{offer.offerDescription}</p>
                      {offer.endDate && (
                        <p className="text-xs text-orange-600 mt-1">
                          Valid until {new Date(offer.endDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      {offer.isActivated ? (
                        <Badge className="bg-green-100 text-green-700">Activated</Badge>
                      ) : (
                        <Badge variant="outline">Not Activated</Badge>
                      )}
                    </div>
                  </div>
                ))}
                {merchantOffers.length > 3 && (
                  <p className="text-sm text-gray-600 text-center">
                    +{merchantOffers.length - 3} more offers available
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Recommendations Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All Cards</TabsTrigger>
              <TabsTrigger value="portfolio" disabled={!user || portfolioRecommendations.length === 0}>
                From Your Portfolio ({portfolioRecommendations.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {allRecommendations.map((recommendation, index) => (
                <RecommendationCard 
                  key={recommendation.card.id} 
                  recommendation={recommendation} 
                  rank={index + 1} 
                  category={category} 
                />
              ))}
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-4">
              {portfolioRecommendations.length > 0 ? (
                <>
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Best Cards from Your Portfolio
                    </h3>
                    <p className="text-gray-600">These are the cards you already have that work best for {category}</p>
                  </div>
                  {portfolioRecommendations.map((recommendation, index) => (
                    <RecommendationCard 
                      key={recommendation.card.id} 
                      recommendation={recommendation} 
                      rank={index + 1} 
                      category={category}
                      isPortfolioCard={true}
                    />
                  ))}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No cards in your portfolio match this category.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}

      {searchTriggered && !isLoading && allRecommendations.length === 0 && category && (
        <div className="text-center py-12">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No specific recommendations found</h3>
          <p className="text-gray-600 mb-4">
            Try searching for a different category or browse all cards to find the best option.
          </p>
          <Button variant="outline" onClick={() => setCategory('')}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
}

function RecommendationCard({ 
  recommendation, 
  rank, 
  category, 
  isPortfolioCard = false 
}: { 
  recommendation: CardRecommendation; 
  rank: number; 
  category: string;
  isPortfolioCard?: boolean;
}) {
  const { card, relevantCategory, isInPortfolio, portfolioNickname, relevantOffers } = recommendation;
  const isTopChoice = rank === 1;

  const getNetworkColor = (network: string) => {
    switch (network.toLowerCase()) {
      case 'visa': return 'bg-blue-100 text-blue-700';
      case 'mastercard': return 'bg-red-100 text-red-700';
      case 'american express': return 'bg-green-100 text-green-700';
      case 'discover': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className={`transition-all duration-300 border-0 ${
      isTopChoice && !isPortfolioCard
        ? 'bg-gradient-to-r from-teal-50 to-green-50 ring-2 ring-teal-200' 
        : isPortfolioCard
        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 ring-2 ring-blue-200'
        : 'bg-white hover:shadow-md'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Rank Badge */}
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            isTopChoice && !isPortfolioCard
              ? 'bg-gradient-to-r from-teal-500 to-green-500 text-white' 
              : isPortfolioCard
              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {rank}
          </div>

          {/* Card Image */}
          <div className="w-16 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src={card.imageUrl} 
              alt={card.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `<span class="text-xs font-medium text-gray-500">${card.issuer}</span>`;
              }}
            />
          </div>

          {/* Card Details */}
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <span>{portfolioNickname || card.name}</span>
                  {isTopChoice && !isPortfolioCard && (
                    <Badge className="bg-gradient-to-r from-teal-500 to-green-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Best Choice
                    </Badge>
                  )}
                  {isPortfolioCard && (
                    <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                      Your Card
                    </Badge>
                  )}
                  {isInPortfolio && !isPortfolioCard && (
                    <Badge className="bg-green-100 text-green-700">
                      In Portfolio
                    </Badge>
                  )}
                </h3>
                {portfolioNickname && (
                  <p className="text-xs text-gray-500">{card.name}</p>
                )}
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-sm text-gray-600">{card.issuer}</p>
                  <Badge className={`text-xs ${getNetworkColor(card.network)}`}>
                    {card.network}
                  </Badge>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-teal-600">
                  {relevantCategory.cashbackRate}%
                </div>
                <div className="text-xs text-gray-500">cashback</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Category: {relevantCategory.category}</span>
              <span className="text-gray-600">
                Annual Fee: {card.annualFee === 0 ? 'No Fee' : `$${card.annualFee}`}
              </span>
            </div>

            {relevantCategory.isRotating && relevantCategory.validUntil && (
              <div className="flex items-center space-x-2 text-sm">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <span className="text-orange-600">
                  Rotating category valid until {new Date(relevantCategory.validUntil).toLocaleDateString()}
                </span>
              </div>
            )}

            {/* Merchant Offers */}
            {relevantOffers.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Gift className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">Special Offers</span>
                </div>
                <div className="space-y-1">
                  {relevantOffers.slice(0, 2).map((offer) => (
                    <div key={offer.id} className="text-xs bg-orange-50 p-2 rounded border border-orange-200">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-orange-900">{offer.merchantName}</span>
                        {offer.isActivated ? (
                          <Badge className="bg-green-100 text-green-700 text-xs">Activated</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">Not Activated</Badge>
                        )}
                      </div>
                      <p className="text-orange-700 mt-1">{offer.offerDescription}</p>
                    </div>
                  ))}
                  {relevantOffers.length > 2 && (
                    <p className="text-xs text-gray-600">+{relevantOffers.length - 2} more offers</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-1">
              {card.categories.slice(0, 4).map((cat, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {cat.cashbackRate}% {cat.category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
