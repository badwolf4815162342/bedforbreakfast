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
      inRoleOf: "MEAL"
      description: "fvzfuz"
      receiver: "5d2e4f790000f5471085c4d9"
    }
  ) {
    start
    end
    inRoleOf
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
}```

### Update Request 
-> only change requestStatus: 'REQUESTED' | 'ACCEPTED' | 'CANCELLED' | 'DENIED'


## Rating and Reference:

### Submit Rating:
### Submit TripReport:
