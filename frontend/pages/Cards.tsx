import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Filter, Plus, CreditCard as CreditCardIcon, User, Wallet } from 'lucide-react';
import backend from '~backend/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../contexts/AuthContext';
import type { Card as CreditCard } from '~backend/cards/list';
import type { UserCard } from '~backend/cards/portfolio';

export default function Cards() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssuer, setSelectedIssuer] = useState<string>('');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCardName, setNewCardName] = useState('');
  const [newCardIssuer, setNewCardIssuer] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: cardsData, isLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: () => backend.cards.list(),
  });

  const { data: portfolioData, isLoading: isPortfolioLoading } = useQuery({
    queryKey: ['portfolio', user?.userId],
    queryFn: () => user ? backend.cards.getUserPortfolio({ userId: user.userId }) : null,
    enabled: !!user,
  });

  const addCardMutation = useMutation({
    mutationFn: (data: { name: string; issuer?: string }) => 
      backend.cards.addCard(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      setIsAddDialogOpen(false);
      setNewCardName('');
      setNewCardIssuer('');
      toast({
        title: data.isNew ? "Card Added" : "Card Found",
        description: data.isNew 
          ? `${data.card.name} has been added to the database.`
          : `${data.card.name} was already in our database.`,
      });
    },
    onError: (error: any) => {
      console.error('Add card error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add card. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addToPortfolioMutation = useMutation({
    mutationFn: (data: { cardId: number; nickname?: string }) => 
      user ? backend.cards.addToPortfolio({ 
        userId: user.userId, 
        cardId: data.cardId, 
        nickname: data.nickname 
      }) : Promise.reject('Not authenticated'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', user?.userId] });
      toast({
        title: "Card Added to Portfolio",
        description: "The card has been added to your portfolio.",
      });
    },
    onError: (error: any) => {
      console.error('Add to portfolio error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add card to portfolio.",
        variant: "destructive",
      });
    },
  });

  const cards = cardsData?.cards || [];
  const portfolioCards = portfolioData?.cards || [];
  const issuers = [...new Set(cards.map(card => card.issuer))];
  const networks = [...new Set(cards.map(card => card.network))];

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIssuer = !selectedIssuer || card.issuer === selectedIssuer;
    const matchesNetwork = !selectedNetwork || card.network === selectedNetwork;
    return matchesSearch && matchesIssuer && matchesNetwork;
  });

  const handleAddCard = () => {
    if (!newCardName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a card name.",
        variant: "destructive",
      });
      return;
    }

    addCardMutation.mutate({
      name: newCardName.trim(),
      issuer: newCardIssuer.trim() || undefined
    });
  };

  const handleAddToPortfolio = (cardId: number) => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to add cards to your portfolio.",
        variant: "destructive",
      });
      return;
    }

    addToPortfolioMutation.mutate({ cardId });
  };

  const isCardInPortfolio = (cardId: number) => {
    return portfolioCards.some(pc => pc.card.id === cardId);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Credit Cards</h1>
          <p className="text-gray-600">Explore our comprehensive database of credit cards</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-500 hover:bg-teal-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Card
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Credit Card</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Card Name *</Label>
                <Input
                  id="cardName"
                  placeholder="e.g., Chase Sapphire Reserve"
                  value={newCardName}
                  onChange={(e) => setNewCardName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardIssuer">Issuer (Optional)</Label>
                <Input
                  id="cardIssuer"
                  placeholder="e.g., Chase, Amex, Capital One"
                  value={newCardIssuer}
                  onChange={(e) => setNewCardIssuer(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={addCardMutation.isPending}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddCard}
                  disabled={addCardMutation.isPending}
                  className="bg-teal-500 hover:bg-teal-600"
                >
                  {addCardMutation.isPending ? 'Adding...' : 'Add Card'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all" className="flex items-center space-x-2">
            <CreditCardIcon className="h-4 w-4" />
            <span>All Cards</span>
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center space-x-2" disabled={!user}>
            <Wallet className="h-4 w-4" />
            <span>My Portfolio</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search cards or issuers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedIssuer === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedIssuer('')}
                className={selectedIssuer === '' ? 'bg-teal-500 hover:bg-teal-600' : ''}
              >
                All Issuers
              </Button>
              {issuers.map(issuer => (
                <Button
                  key={issuer}
                  variant={selectedIssuer === issuer ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedIssuer(issuer)}
                  className={selectedIssuer === issuer ? 'bg-teal-500 hover:bg-teal-600' : ''}
                >
                  {issuer}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedNetwork === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedNetwork('')}
                className={selectedNetwork === '' ? 'bg-green-500 hover:bg-green-600' : ''}
              >
                All Networks
              </Button>
              {networks.map(network => (
                <Button
                  key={network}
                  variant={selectedNetwork === network ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedNetwork(network)}
                  className={selectedNetwork === network ? 'bg-green-500 hover:bg-green-600' : ''}
                >
                  {network}
                </Button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCards.map((card) => (
              <CreditCardComponent 
                key={card.id} 
                card={card} 
                isInPortfolio={isCardInPortfolio(card.id)}
                onAddToPortfolio={() => handleAddToPortfolio(card.id)}
                showAddButton={!!user}
                isAddingToPortfolio={addToPortfolioMutation.isPending}
              />
            ))}
          </div>

          {filteredCards.length === 0 && (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No cards found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          {user ? (
            isPortfolioLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-32 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : portfolioCards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolioCards.map((userCard) => (
                  <PortfolioCardComponent key={userCard.id} userCard={userCard} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No cards in portfolio</h3>
                <p className="text-gray-600 mb-4">Add cards from the "All Cards" tab to start building your portfolio</p>
                <Button onClick={() => setActiveTab('all')} className="bg-teal-500 hover:bg-teal-600">
                  Browse All Cards
                </Button>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sign in to view your portfolio</h3>
              <p className="text-gray-600">Create an account to track your credit cards and get personalized recommendations</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CreditCardComponent({ 
  card, 
  isInPortfolio, 
  onAddToPortfolio, 
  showAddButton, 
  isAddingToPortfolio 
}: { 
  card: CreditCard; 
  isInPortfolio: boolean;
  onAddToPortfolio: () => void;
  showAddButton: boolean;
  isAddingToPortfolio: boolean;
}) {
  const bestCategory = card.categories.reduce((best, current) => 
    current.cashbackRate > best.cashbackRate ? current : best
  );

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
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            {card.imageUrl ? (
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
            ) : (
              <span className="text-xs font-medium text-gray-500">{card.issuer}</span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
              {card.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-sm text-gray-600">{card.issuer}</p>
              <Badge className={`text-xs ${getNetworkColor(card.network)}`}>
                {card.network}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Annual Fee</span>
          <span className="font-medium text-gray-900">
            {card.annualFee === 0 ? 'No Fee' : `$${card.annualFee}`}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Best Rate</span>
            <Badge variant="secondary" className="bg-teal-100 text-teal-700">
              {bestCategory.cashbackRate}% {bestCategory.category}
            </Badge>
          </div>
          
          {bestCategory.isRotating && bestCategory.validUntil && (
            <p className="text-xs text-orange-600">
              Rotating category valid until {new Date(bestCategory.validUntil).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <span className="text-sm font-medium text-gray-700">Categories:</span>
          <div className="flex flex-wrap gap-1">
            {card.categories.slice(0, 3).map((category, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {category.cashbackRate}% {category.category}
              </Badge>
            ))}
            {card.categories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{card.categories.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {showAddButton && (
          <div className="pt-2">
            {isInPortfolio ? (
              <Badge className="bg-green-100 text-green-700 w-full justify-center">
                In Portfolio
              </Badge>
            ) : (
              <Button 
                onClick={onAddToPortfolio}
                disabled={isAddingToPortfolio}
                size="sm"
                className="w-full bg-teal-500 hover:bg-teal-600"
              >
                {isAddingToPortfolio ? 'Adding...' : 'Add to Portfolio'}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PortfolioCardComponent({ userCard }: { userCard: UserCard }) {
  const { card } = userCard;
  const bestCategory = card.categories.reduce((best, current) => 
    current.cashbackRate > best.cashbackRate ? current : best
  );

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
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-teal-50 to-green-50">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            {card.imageUrl ? (
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
            ) : (
              <span className="text-xs font-medium text-gray-500">{card.issuer}</span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {userCard.nickname || card.name}
            </h3>
            {userCard.nickname && (
              <p className="text-xs text-gray-500">{card.name}</p>
            )}
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-sm text-gray-600">{card.issuer}</p>
              <Badge className={`text-xs ${getNetworkColor(card.network)}`}>
                {card.network}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        {userCard.creditLimit && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Credit Limit</span>
            <span className="font-medium text-gray-900">${userCard.creditLimit.toLocaleString()}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Best Rate</span>
          <Badge variant="secondary" className="bg-teal-100 text-teal-700">
            {bestCategory.cashbackRate}% {bestCategory.category}
          </Badge>
        </div>

        <div className="space-y-1">
          <span className="text-sm font-medium text-gray-700">Categories:</span>
          <div className="flex flex-wrap gap-1">
            {card.categories.slice(0, 3).map((category, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {category.cashbackRate}% {category.category}
              </Badge>
            ))}
            {card.categories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{card.categories.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500">
          Added {new Date(userCard.addedAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}
