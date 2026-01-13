import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  useCreateProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from '../../slices/productsApiSlice';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';

const ProductFormPage = () => {
  const { id: productId } = useParams();
  const isUpdateMode = !!productId;

  const [name, setName] = useState('');
  const [image, setImage] = useState(''); // Used for showing existing image path
  const [imageFile, setImageFile] = useState(null); // STORES THE ACTUAL FILE
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId, {
    skip: !isUpdateMode
  });

  const [createProduct, { isLoading: isCreateProductLoading }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdateProductLoading }] = useUpdateProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdateMode && product) {
      setName(product.name);
      setImage(product.image);
      setDescription(product.description);
      setBrand(product.brand);
      setCategory(product.category);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [isUpdateMode, product]);

  // JUST UPDATES LOCAL STATE, NO API CALL HERE
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validations
    if (!isUpdateMode && !imageFile) {
      toast.error('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('countInStock', countInStock);
    
    // Append the file if it exists
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (isUpdateMode) {
        // For updates, we pass the id and the formData
        const res = await updateProduct({ productId, formData }).unwrap();
        toast.success(res.message || 'Product Updated');
      } else {
        const res = await createProduct(formData).unwrap();
        toast.success(res.message || 'Product Created');
      }
      navigate('/admin/product-list');
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Something went wrong');
      console.log("error:-",err);
      
    }
  };

  return (
    <>
      <Meta title={'Product Form'} />
      <Link to='/admin/product-list' className='btn btn-light my-3'>
        Go Back
      </Link>
      {(isUpdateProductLoading || isCreateProductLoading) && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <FormContainer>
          <h1>{isUpdateMode ? 'Update Product' : 'Create Product'}</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={e => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              {isUpdateMode && <p className="text-muted small">Current: {image}</p>}
              <Form.Control
                type='file'
                onChange={handleFileChange}
              ></Form.Control>
            </Form.Group>

            {/* ... rest of your Form Groups (Brand, Stock, Category, Description) remain the same ... */}
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={e => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={e => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter description'
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
              {isUpdateMode ? 'Update Product' : 'Create Product'}
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ProductFormPage;