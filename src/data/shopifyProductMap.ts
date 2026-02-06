import type { StepId } from "../pages/Home";

/**
 * Shopify Product ID Mapping
 * Maps product codes (StepId) to Shopify product IDs
 * 
 * TODO: Client needs to provide the actual Shopify product IDs for each product
 * These can be found in Shopify admin or via the Buy Button embed code
 */
export const SHOPIFY_PRODUCT_IDS: Partial<Record<StepId, string>> = {
  // 8-Step Riot Line Products
  grip: '', // TODO: Add Shopify product ID for GRIP (RG-STEP01-GRIP)
  purge: '', // TODO: Add Shopify product ID for PURGE (RG-STEP02-PURGE)
  assault: '', // TODO: Add Shopify product ID for ASSAULT (RG-STEP03-ASSAULT)
  clarity: '', // TODO: Add Shopify product ID for CLARITY (RG-STEP04-CLARITY)
  cockpit: '', // TODO: Add Shopify product ID for COCKPIT (RG-STEP05-COCKPIT)
  revive: '', // TODO: Add Shopify product ID for REVIVE (RG-STEP06-REVIVE)
  lustre: '', // TODO: Add Shopify product ID for LUSTRE (RG-STEP07-LUSTRE)
  shield: '', // TODO: Add Shopify product ID for SHIELD (RG-STEP08-SHIELD)
  
  // Intervention Zone Products
  'x-dirty': '', // TODO: Add Shopify product ID for X·DIRTY DETAILS (RG-X-DIRTY)
  'x-extract': '', // TODO: Add Shopify product ID for X·TRACT (RG-X-EXTRACT)
  'x-blaq': '', // TODO: Add Shopify product ID for X·SEE SPOT RUN (RG-X-BLAQ)
  'x-fal': '', // TODO: Add Shopify product ID for X·FALLOUT (RG-X-FAL)
  'x-field': '', // TODO: Add Shopify product ID for X·FIELD WASH (RG-X-FIELD)
  'z-fortify': '', // TODO: Add Shopify product ID for Z·FORTIFY (RG-Z-FORTIFY)
};

/**
 * Get Shopify product ID for a given step/product
 * Returns undefined if not mapped yet
 */
export function getShopifyProductId(stepId: StepId): string | undefined {
  return SHOPIFY_PRODUCT_IDS[stepId];
}

/**
 * Check if a product has a Shopify product ID mapped
 */
export function hasShopifyProductId(stepId: StepId): boolean {
  const productId = SHOPIFY_PRODUCT_IDS[stepId];
  return !!productId && productId.trim() !== '';
}
