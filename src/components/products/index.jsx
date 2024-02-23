import { useEffect } from 'react';
import './styles.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIDSProducts, fetchProducts } from '../../store/thunk/products-thunk';
import Filters from '../filters';
import Spinner from '../spinner';

function Products() {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesLength, setPagesLength] = useState();
  const itemsPerPage = 10;
  const [topLine, setTopLine] = useState(10);
  const [bottomLine, setBottomLine] = useState(0);
  const clickMore = () => {
    setTopLine(topLine + itemsPerPage);
    setBottomLine(bottomLine + itemsPerPage);
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const clickLess = () => {
    setTopLine(topLine - itemsPerPage);
    setBottomLine(bottomLine - itemsPerPage);
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const [ids, setIds] = useState([]);
  // считываем products
  const prodArray = useSelector((state) => state.products.productsData);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(prodArray.result);
  }, [prodArray]);

  // отправляем запрос на поиск id без параметров конкретного поиска
  useEffect(() => {
    const dataParams = {
      action: 'get_ids',
      params: { offset: 0, limit: 100 }
    };

    dispatch(fetchIDSProducts({ dataParams }))
      .unwrap()
      .then((response) => setIds(response.result));
  }, []);

  useEffect(() => {
    if (ids && ids.length > 0) {
      const dataProdParams = {
        action: 'get_items',
        params: { ids: ids }
      };
      dispatch(fetchProducts({ dataProdParams }));
    }
  }, [ids]);

  const statusLoad = useSelector((state) => state.products.loadingProducts);

  const productsPage = products && products.slice(bottomLine, topLine);
  useEffect(() => {
    if (products) {
      setPagesLength(Math.ceil(products.length / itemsPerPage));
    }
  }, [products]);
  return (
    <>
      <Filters />
      <div className='products__container'>
        {statusLoad === true ? (
          <div className='spinner__container'>
            <Spinner />
          </div>
        ) : (
          <>
            {productsPage && productsPage.length > 0 && ids ? (
              productsPage.map((item) => (
                <div className='products__item' key={`${item.product}-${uuidv4()}`}>
                  <div> Брэнд: {item.brand} </div>
                  <div> Цена: {item.price} </div>
                  <div> Название: {item.product} </div>
                </div>
              ))
            ) : (
              <div>Извините, ничего не найдено</div>
            )}
          </>
        )}
      </div>

      {statusLoad !== true && pagesLength && productsPage && (
        <>
          <div className='pagination'>
            <button
              onClick={clickLess}
              disabled={currentPage === 1}
              className='pages__button'>
              Назад
            </button>
            <span className='current__button'>{currentPage}</span>
            <button
              onClick={clickMore}
              disabled={currentPage === pagesLength}
              className='pages__button'>
              Вперед
            </button>
          </div>
          <div className='quantity__pages'>Всего страниц: {pagesLength}</div>
        </>
      )}
    </>
  );
}

export default Products;
