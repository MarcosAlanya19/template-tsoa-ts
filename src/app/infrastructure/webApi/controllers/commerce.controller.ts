import { CreateCommerceDto } from "@dtos/commerce.dto";
import { CommerceEntity } from "@entities/commerce.entity";
import { CreateCommerceValidator, GetByIdCommerceValidator } from "@middlewares/validators/commerce.validator";
import { commerceServiceInstance } from "@services/commerce.service";
import { HttpResponse } from "@utils/httpResponse.utils";
import { Body, Controller, Get, Middlewares, Path, Post, Route } from "tsoa";

@Route('commerces')
export class CommerceController extends Controller {
  constructor(private readonly commerceService = commerceServiceInstance) {
    super();
  }

  @Middlewares(CreateCommerceValidator)
  @Post()
  async createCommerce(@Body() body: CreateCommerceDto) {
    return await this.commerceService.create(body);
  }

  @Middlewares(GetByIdCommerceValidator)
  @Get('{commerceId}')
  async getByIdCommerce(@Path() commerceId: string): Promise<HttpResponse<CommerceEntity>> {
    const UserById = await this.commerceService.getById(commerceId);
    return new HttpResponse<CommerceEntity>(UserById);
  }
}
