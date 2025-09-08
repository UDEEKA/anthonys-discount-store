import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import './ProductCard.css'; // Import the CSS file for product card styling

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  
  const discountPercentage = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  
  return (
    <div className="product-card">
      {/* Gradient animation background */}
      <div className="product-card-gradient"></div>
      
      {/* 3D Card Container */}
      <div className="product-card-inner">
        <Card className="group bg-transparent border-0 shadow-none h-full flex flex-col">
          <CardHeader className="pb-4 flex-grow-0">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image"
              />
              {discountPercentage > 0 && (
                <Badge className="discount-badge bg-primary text-primary-foreground">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="product-details flex-grow flex flex-col">
            <div className="flex-grow">
              <h3 className="product-name font-semibold text-lg text-foreground">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.weight}</p>
              {product.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl font-bold text-primary">Rs. {product.price.toLocaleString()}</span>
              {product.mrp !== product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  Rs. {product.mrp.toLocaleString()}
                </span>
              )}
            </div>
            
            <Button 
              onClick={() => addItem(product)}
              className="add-to-cart-btn w-full mt-4 group-hover:shadow-[var(--shadow-primary)] transition-all duration-300"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};