import { describe, expect, it } from "../../../../../tests";
import fakes from "../../../../../tests/fakes";
import { genRandomInt, genRandomStr } from "../../../../../tests/utils";
import Product from "../../models/product";
import FakeProductsRepository from "../../repositories/fakes/fake-products-repository";
import { CreateProductParams } from "../create-product/create-product-use-case";
import ListProductsUseCase from "./list-products-use-case";

interface ICreateProduct extends CreateProductParams {
  slug: string;
}

const genProduct = (): ICreateProduct => ({
  brandId: fakes.id(),
  slug: genRandomStr(15, 52).toLowerCase(),
  description: genRandomStr(30, 2000),
  name: genRandomStr(15, 52),
  price: genRandomInt(1, 152000) / 100,
  quantity: genRandomInt(1, 1200),
});

const makeSut = () => {
  const fakeProductsRepository = new FakeProductsRepository();
  const listProductsUseCase = new ListProductsUseCase(fakeProductsRepository);

  return { fakeProductsRepository, listProductsUseCase };
};

describe("[ListProductsUseCase]", () => {
  it.concurrent("should be able to list all products", async () => {
    const { fakeProductsRepository, listProductsUseCase } = makeSut();

    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));

    const result = await listProductsUseCase.execute();

    expect(result).toHaveProperty("products");
    expect(result.products).toHaveLength(10);
  });
});
