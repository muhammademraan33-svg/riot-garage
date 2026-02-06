import { useEffect, useRef } from 'react';

interface ShopifyProductButtonProps {
  productId: string;
  componentId?: string;
  domain?: string;
  storefrontAccessToken?: string;
  moneyFormat?: string;
  options?: any;
  className?: string;
}

/**
 * Shopify Product Button Component
 * Renders a single product Buy Button using the Shopify Buy Button SDK
 */
export function ShopifyProductButton({
  productId,
  componentId,
  domain = 'wyf7ge-h8.myshopify.com',
  storefrontAccessToken = 'e0313673888826608362a82dfd9fe1e2',
  moneyFormat = '%24%7B%7Bamount%7D%7D',
  options,
  className = '',
}: ShopifyProductButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return;

    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    const loadScript = () => {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
      script.onload = ShopifyBuyInit;
    };

    const ShopifyBuyInit = () => {
      if (!window.ShopifyBuy || !window.ShopifyBuy.UI) {
        console.error('Shopify Buy Button SDK not loaded');
        return;
      }

      const client = window.ShopifyBuy.buildClient({
        domain,
        storefrontAccessToken,
      });

      window.ShopifyBuy.UI.onReady(client)
        .then((ui: any) => {
          if (!containerRef.current) return;

          const defaultOptions = {
          product: {
            styles: {
              product: {
                '@media (min-width: 601px)': {
                  'max-width': '100%',
                  'margin-left': '0px',
                  'margin-bottom': '0px',
                },
              },
            },
            text: {
              button: 'Add to cart',
            },
            buttonDestination: 'modal',
            contents: {
              img: false,
              imgWithCarousel: true,
              button: false,
              buttonWithQuantity: true,
            },
          },
          cart: {
            text: {
              total: 'Subtotal',
              button: 'Checkout',
            },
          },
          modalProduct: {
            contents: {
              img: false,
              imgWithCarousel: true,
              button: false,
              buttonWithQuantity: true,
            },
            styles: {
              product: {
                '@media (min-width: 601px)': {
                  'max-width': '100%',
                  'margin-left': '0px',
                  'margin-bottom': '0px',
                },
              },
            },
            text: {
              button: 'Add to cart',
            },
          },
        };

        const finalOptions = options ? { ...defaultOptions, ...options } : defaultOptions;

        ui.createComponent('product', {
          id: productId,
          node: containerRef.current,
          moneyFormat,
          options: finalOptions,
        });

          initializedRef.current = true;
        })
        .catch((error: any) => {
          console.error('Shopify Buy Button Error:', error);
          if (containerRef.current) {
            containerRef.current.innerHTML = `
              <button 
                class="rounded-lg bg-[#FF6B35] px-8 py-3 text-base font-bold tracking-wider text-white shadow-[0_0_20px_rgba(255,107,53,0.4)] hover:bg-[#FF8C5A] transition-colors"
                onclick="alert('Shopify integration error. Please contact support.')"
              >
                + ADD TO GO-BAG
              </button>
            `;
          }
        });
    };

    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }

    return () => {
      // Cleanup if needed
      initializedRef.current = false;
    };
  }, [productId, domain, storefrontAccessToken, moneyFormat, options]);

  const uniqueId = componentId || `product-component-${productId}-${Math.random().toString(36).substr(2, 9)}`;

  return <div id={uniqueId} ref={containerRef} className={`shopify-product-button ${className}`} />;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ShopifyBuy?: any;
  }
}
