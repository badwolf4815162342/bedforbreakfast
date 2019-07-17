import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request } from './models/Request';
import { RequestService } from './request.service';

@Resolver((of: any) => {
  return Request;
})
export class RequestResolver {
  constructor(private readonly requestService: RequestService) {}

  @Query((returns) => [Request])
  async requests(): Promise<Request[]> {
    return this.requestService.findAll();
  }

  @Mutation((returns) => Request)
  async createRequest(@Args('createRequestDto') createRequestDto: CreateRequestDto): Promise<Request> {
    return await this.requestService.create(createRequestDto);
  }
}
