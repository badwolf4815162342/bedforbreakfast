import React from 'react';

interface FeedItemProps {
  country: string;
  city: string;
}

export const FeedItem: React.FC<FeedItemProps> = ({ country, city }) => (
  <div>
    {country}: {city}
  </div>
);
