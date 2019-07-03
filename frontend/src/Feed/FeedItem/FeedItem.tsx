import React from 'react';

interface FeedItemProps {
  name: string;
  city: string;
}

export const FeedItem: React.FC<FeedItemProps> = ({ name, city }) => (
  <div>
    {name}: {city}
  </div>
);
