import { IProduct } from '../interfaces';
import { Product } from '../models';
import { db } from '.';

export const getProductsBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) return null;
  // técnica para serializar datos como el object id de mongo y fechas
  return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
  slug: string;
}

export const getAllProductsSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await Product.find().select('-_id slug').lean();
  await db.disconnect();
  return slugs;
};

export const getProductsByQuery = async (
  query: string
): Promise<IProduct[]> => {
  await db.connect();
  const products = await Product.find({
    $text: { $search: query.toLowerCase() },
  })
    .select('-_id title images price inStock slug')
    .lean();
  await db.disconnect();
  return products;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.connect();
  const producst = await Product.find()
    .select('-_id title images price inStock slug')
    .lean();
  await db.disconnect();
  return producst;
};
