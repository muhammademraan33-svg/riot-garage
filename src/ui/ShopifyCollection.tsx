import { useEffect, useRef } from 'react';

// Global set to track initialized collections (prevents duplicates in React Strict Mode)
const initializedCollections = new Set<string>();

interface ShopifyCollectionProps {
  collectionId: string;
  componentId?: string;
  domain?: string;
  storefrontAccessToken?: string;
  moneyFormat?: string;
  options?: any;
}

/**
 * Shopify Collection Component
 * Renders a Shopify collection using the Buy Button SDK
 */
export function ShopifyCollection({
  collectionId,
  componentId,
  domain = 'wyf7ge-h8.myshopify.com',
  storefrontAccessToken = 'e0313673888826608362a82dfd9fe1e2',
  moneyFormat = '%24%7B%7Bamount%7D%7D',
  options,
}: ShopifyCollectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const componentInstanceRef = useRef<any>(null);
  const uniqueKey = `${collectionId}-${componentId || 'default'}`;

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Prevent double initialization using global Set
    if (initializedCollections.has(uniqueKey)) {
      return;
    }
    
    // Mark as initializing
    initializedCollections.add(uniqueKey);
    
    // Clear any existing content to prevent duplicates
    containerRef.current.innerHTML = '';

    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    const loadScript = () => {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
      script.onload = ShopifyBuyInit;
    };

    const ShopifyBuyInit = () => {
      try {
        if (!window.ShopifyBuy || !window.ShopifyBuy.UI) {
          console.error('Shopify Buy Button SDK not loaded');
          initializedCollections.delete(uniqueKey);
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
                  'max-width': 'calc(25% - 20px)',
                  'margin-left': '20px',
                  'margin-bottom': '50px',
                  'width': 'calc(25% - 20px)',
                },
                img: {
                  height: 'calc(100% - 15px)',
                  position: 'absolute',
                  left: '0',
                  right: '0',
                  top: '0',
                },
                imgWrapper: {
                  'padding-top': 'calc(75% + 15px)',
                  position: 'relative',
                  height: '0',
                },
              },
            },
            text: {
              button: 'Add to cart',
            },
          },
          productSet: {
            styles: {
              products: {
                '@media (min-width: 601px)': {
                  'margin-left': '-20px',
                },
              },
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
          option: {},
          cart: {
            text: {
              total: 'Subtotal',
              button: 'Checkout',
            },
          },
          toggle: {},
        };

        const finalOptions = options ? { ...defaultOptions, ...options } : defaultOptions;

        // Destroy existing component if it exists
        if (componentInstanceRef.current) {
          try {
            componentInstanceRef.current.destroy();
          } catch (e) {
            // Ignore destroy errors
          }
        }

        const component = ui.createComponent('collection', {
          id: collectionId,
          node: containerRef.current,
          moneyFormat,
          options: finalOptions,
        });

        componentInstanceRef.current = component;
        })
        .catch((error: any) => {
          console.error('Shopify Buy Button Error:', error);
          // Remove from initialized set on error so it can retry
          initializedCollections.delete(uniqueKey);
          
          if (containerRef.current) {
            const errorMessage = error?.message || error?.toString() || 'Connection failed';
            // Clean error message - remove confusing references
            const cleanErrorMessage = errorMessage.replace(/initializedRef is not defined/gi, '').trim() || 'Connection failed';
            
            containerRef.current.innerHTML = `
              <div style="padding: 20px; background: rgba(255, 107, 53, 0.1); border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 8px; color: #FF6B35;">
                <p style="font-weight: bold; margin-bottom: 8px;">Unable to load Shopify products</p>
                <p style="font-size: 14px; color: rgba(255, 255, 255, 0.7);">
                  Please check:<br/>
                  1. Storefront access token is valid<br/>
                  2. Domain is correct: ${domain}<br/>
                  3. Collection ID exists: ${collectionId}<br/>
                  4. Network connection is active
                </p>
                <p style="font-size: 12px; color: rgba(255, 255, 255, 0.5); margin-top: 8px;">
                  Error: ${cleanErrorMessage}
                </p>
              </div>
            `;
          }
        });
      } catch (initError: any) {
        console.error('Shopify Buy Button Initialization Error:', initError);
        initializedCollections.delete(uniqueKey);
        
        if (containerRef.current) {
          const errorMessage = initError?.message || initError?.toString() || 'Initialization failed';
          // Clean error message - remove confusing references
          const cleanErrorMessage = errorMessage.replace(/initializedRef is not defined/gi, '').trim() || 'Initialization failed';
          
          containerRef.current.innerHTML = `
            <div style="padding: 20px; background: rgba(255, 107, 53, 0.1); border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 8px; color: #FF6B35;">
              <p style="font-weight: bold; margin-bottom: 8px;">Unable to initialize Shopify products</p>
              <p style="font-size: 14px; color: rgba(255, 255, 255, 0.7);">
                Please check:<br/>
                1. Storefront access token is valid<br/>
                2. Domain is correct: ${domain}<br/>
                3. Collection ID exists: ${collectionId}<br/>
                4. Network connection is active
              </p>
              <p style="font-size: 12px; color: rgba(255, 255, 255, 0.5); margin-top: 8px;">
                Error: ${cleanErrorMessage}
              </p>
            </div>
          `;
        }
      }
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
      // Cleanup: destroy the Shopify component instance
      if (componentInstanceRef.current) {
        try {
          componentInstanceRef.current.destroy();
          componentInstanceRef.current = null;
        } catch (e) {
          // Ignore destroy errors during cleanup
        }
      }
      // Clear container content
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      // Remove from initialized set when component unmounts
      // This allows re-initialization if collectionId/componentId changes
      initializedCollections.delete(uniqueKey);
    };
  }, [collectionId, domain, storefrontAccessToken, moneyFormat, options]);

  const uniqueId = componentId || `collection-component-${collectionId}-${Math.random().toString(36).substr(2, 9)}`;

  return <div id={uniqueId} ref={containerRef} className="shopify-collection-container" />;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ShopifyBuy?: any;
  }
}
