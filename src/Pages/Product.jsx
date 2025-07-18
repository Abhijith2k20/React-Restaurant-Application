import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../Context/CartProvider';
import '../Styles/Product.scss';
import MyNavbar from '../components/Navbar/Navbar';
import { Nav, Container, Row, Col, Card, Modal, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import pg from '../Assets/pg.png'



const Product = () => {
  const location = useLocation();
  const selectedCategory = location.state?.category || 'Chicken';
  const [categories, setCategories] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [active, setActive] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      fetchMealsByCategory(categories.slice(0, 6));
      setActive(selectedCategory);
    }
  }, [categories, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const result = await res.json();
      setCategories(result.categories);
      console.log(result)
    } catch (err) {

      console.log('Categories Error', err);
    }
  };

  const fetchMealsByCategory = async (categoryList) => {
    try {
      const promises = categoryList.map(cat =>
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat.strCategory}`)
          .then(res => res.json())
          .then(data =>
            (data.meals || []).map(meal => ({
              ...meal,
              strCategory: cat.strCategory
            }))
          )
      );

      const mealsByCategory = await Promise.all(promises);
      const mergedMeals = mealsByCategory.flat();
      setAllMeals(mergedMeals);
    } catch (err) {
      console.log('Fetch all meals error:', err);
    }
  };

  const handleShow = async (item) => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`);
      const result = await res.json();
      setSelectedProduct(result.meals[0]);
      setShow(true);
    } catch (err) {
      console.log('Error loading meal details:', err);
    }
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setShow(false);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    handleClose();
  };

  // ✅ Updated logic: Search all meals if typing; filter by category if not
  const filteredMeals = allMeals.filter(item => {
    const nameMatch = item.strMeal.toLowerCase().includes(searchTerm.toLowerCase());

    if (searchTerm.trim() === "") {
      return item.strCategory === active;
    }

    return nameMatch;
  });

  return (
    <div>
      <MyNavbar />

      {/* Search */}
      <Form className="d-flex justify-content-center mt-4 mb-2">
        <Form.Control
          type="search"
          placeholder="Search meals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-50"
        />
      </Form>

      {/* Category Tabs */}
      <Nav className="justify-content-center mt-3 gap-3" as="ul">
        {categories.slice(0, 12).map((item, index) => (
          <Nav.Item as="li" key={index}>
            <Nav.Link
              className={item.strCategory === active ? "active" : ""}
              onClick={() => {
                setActive(item.strCategory);
                setSearchTerm(""); // Clear search when switching category
              }}
            >
              {item.strCategory}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Meals Grid */}
      <Container className="mt-4 pb-5">
        <Row className="g-4">
          {filteredMeals.map((item, index) => (
            <Col xs={6} sm={6} md={4} lg={3} key={index}>
              <Card
                className="border-0 cursor-pointer custom-card h-100"
                onClick={() => handleShow(item)}
              >
                <Card.Img
                  variant="top"
                  src={item.strMealThumb}
                  alt={item.strMeal}
                  className='cardimg'
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="text-center">
                  <Card.Title className='fw-normal fs-6'>{item.strMeal}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredMeals.length === 0 && (
          <h4 className="text-center text-primary mt-4">No meals found</h4>
        )}
      </Container>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered dialogClassName='responsive-fullwidth-modal'  >
        {selectedProduct && (() => {
          const Ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = selectedProduct[`strIngredient${i}`];
            if (ingredient && ingredient.trim() !== "") {
              Ingredients.push(ingredient);
            }
          }

          return (
            <>
              <Modal.Header closeButton>
                <Modal.Title className="text-start ">
                  {selectedProduct.strMeal}
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Row>
                  <Col md={6} xs={12}>

                    <img
                      src={selectedProduct.strMealThumb}
                      alt={selectedProduct.strMeal}
                      className="img-fluid mb-3 rounded mx-auto d-block"
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                  </Col>
                  <Col md={6} xs={12}>

                    <p><strong>Category:</strong> {selectedProduct.strCategory}</p>
                    <p><strong>Ingredients:</strong> {Ingredients.join(", ")}</p>
                    <center>
                      <button className="custom-add-to-cart-button " onClick={() => handleAddToCart(selectedProduct)}>
                        Add to Cart
                      </button>
                    </center>

                    <center>
                      <img className='img-fluid' style={{ height: '75px', marginTop: '25px' }} src={pg} alt="" />

                    </center>

                  </Col>

                </Row>

              </Modal.Body>

            </>
          );
        })()}
      </Modal>
    </div>
  );
};

export default Product;