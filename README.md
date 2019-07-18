# Bed for Breakfast

## First Time Setup

1. Install top level dependencies: ```npm install```

2. Install other dependencies: ```npm run bootstrap```

3. Start everything in 'dev mode': ```npm run start:dev```

## Folder Structure

- frontend: React project
- backend: Nest.js project
- shared: Any shared typescript models and utility functions

# Graph-Ql Queries

## Requesting:

### Send Request:

```
mutation {
  createRequest(
    createRequestDto: {
      start: "2020-01-01"
      end: "2020-10-01"
      description: "fvzfuz"
      receiver: "5d2e4f790000f5471085c4d9"
    }
  ) {
    start
    end
    description
    requestStatus
    receiver {
      email
    }
    proposer {
      firstName 
      email
    }
  }
}
```

### Update Request 
-> only change requestStatus: 'REQUESTED' | 'ACCEPTED' | 'CANCELLED' | 'DENIED'
```
mutation {
  updateRequestStatus(
    updateRequestStatusDto: {
      _id: "5d305505fee6575d74d0ca51"
      requestStatus: ACCEPTED
    }
  ) {
    start
    end
    description
    requestStatus
    ratings {
      description
      request {
        _id
        description
      }
      receiverRole
      rating
      author {
        firstName
      }
    }
  }
}
```

### Request possible 

Query that has user id , id of host he wants to request, REQUESTED field
=> if this query returns a value you cant request this accomodation again
=> ) I'm creating a request that return true/false (true is can still be requested)

```
query {
canBeRequested(
    canBeRequestedDto: {
      requestId: "5d30dcda17d3053ac8421bb1"
      hostId: "5d2e4f790000f5471085c4d9"
    }
  ) 
}
```

## Rating and Reference:

### Submit Rating:

Is it possible that one person has to positive ratings from the same person because the person rated to trips with this host positive?

```
mutation {
  createRating(
    createRatingDto: {
      request: "5d30577180496764c0dffa6b"
      description: "myrating"
      receiverRole: MEAL
      rating: true
    }
  ) {
    _id
    description
    requestStatus
  }
}
```

### Get ratings rating user x: POTENTIAL BROKEN

receivedRatings query needs userId of user x as a field
```
query {
  receivedRatings (userId: "5d2effa567a4f511e4f4d7d5" ) {
    _id
    description
    receiverRole
    rating
    receiver {
      _id
    }
    request {
      _id
      start
      end
      description
      requestStatus
      ratings {
        _id
      }
    }
    author {
      _id
      firstName
    }
  }
}
```

### Submit TripReport:


## User:

get users meals as list of meals in user query

### GetUsers:

```
query {
  users {
    _id
    firstName
    lastName
    email
    phoneNumber
    firstName
    lastName
    birthday
    gender
    profilePicture
    homeTown
    homeCountry
    favoriteFood
    dislikedBy {
      firstName
      email
    }
    likedBy {
      firstName
      email
    }
    accommodation {
      _id
      isActive
    }
  }
}
```