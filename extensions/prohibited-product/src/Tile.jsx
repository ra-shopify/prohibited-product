import { useState } from 'react';
import React, { useEffect } from 'react';
import { Tile, useCartSubscription, reactExtension, useApi } from '@shopify/ui-extensions-react/point-of-sale';
let textFieldValue = "1"

const TileComponent = () => {
  const api = useApi();
  const cart = useCartSubscription();


  //useEffect(() => {
  removeProhibitedProducts(api, cart);
  //}, [cart]); // Dependency array includes 'cart' to trigger the effect when 'cart' updates
  // subtitle="Auto-Remove Prohibited Products"
  return (
    <Tile
      title="Prohibited Product"
      subtitle={textFieldValue}
      onPress={() => {}}
      enabled
    />
  );
};

function removeProhibitedProducts(api, cart) {
  textFieldValue++
  const cartItems = cart?.lineItems;
  cartItems.forEach((item) => {
    if (item.title === 'Non-Recyclable Plastic') {
      const title = item.title;
      api.cart.removeLineItem(item.uuid);
      api.toast.show(`${title} is prohibited to sell in California and has been removed from the customers cart`, { duration: 2000 });
      api.action.presentModal()
    }
  });
}

export default reactExtension('pos.home.tile.render', () => {
  return <TileComponent />;
});