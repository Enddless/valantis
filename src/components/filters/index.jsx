import { useEffect, useState } from 'react';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchIDSProducts,
  fetchProducts,
  getbyfilters
} from '../../store/thunk/products-thunk';

function Filters() {
  const dispatch = useDispatch();
  const [ids, setIds] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeParams, setActiveParams] = useState('');
  const [error, setError] = useState('');

  // если это фильтры, кроме "все"
  const submitForm = (e) => {
    setError('');
    e.preventDefault();
    let dataParams = {
      action: 'filter',
      params: {}
    };

    if (activeFilter === 'brand') {
      dataParams.params = {
        brand: capitalizeFirstLetter(activeParams)
      };
    } else if (activeFilter === 'product') {
      dataParams.params = { product: activeParams };
    } else if (activeFilter === 'price') {
      dataParams.params = { price: Number(activeParams) };
    } else if (activeFilter === 'all') {
      submitAll();
    }
    dispatch(getbyfilters({ dataParams }))
      .unwrap()
      .then((response) => setIds(response.result))
      .catch(() => setIds([]));
  };

  const submitAll = () => {
    const dataParams = {
      action: 'get_ids',
      params: { offset: 0, limit: 100 }
    };

    dispatch(fetchIDSProducts({ dataParams }))
      .unwrap()
      .then((response) => setIds(response.result));
  };
  //для фильтра все, показываем все товары
  useEffect(() => {
    if (activeFilter === 'all') {
      submitAll();
    }
  }, [activeFilter]);

  useEffect(() => {
    if (ids && ids.length > 0) {
      const dataProdParams = {
        action: 'get_items',
        params: { ids: ids }
      };
      setError('');
      dispatch(fetchProducts({ dataProdParams }));
    } else if (ids.length === 0 && activeParams.length > 0) {
      setError('Извините, ничего не нашлось');
    }
  }, [ids]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <form className='filters__container'>
      <fieldset>
        <input
          type='radio'
          name='filter'
          id='all'
          checked={activeFilter === 'all'}
          onChange={() => setActiveFilter('all')}
        />
        <label htmlFor='all'>Все</label>
      </fieldset>
      <fieldset>
        <input
          type='radio'
          name='filter'
          id='brand'
          checked={activeFilter === 'brand'}
          onChange={() => setActiveFilter('brand')}
        />
        <label htmlFor='brand'>По бренду</label>
      </fieldset>
      <fieldset>
        <input
          type='radio'
          name='filter'
          id='product'
          checked={activeFilter === 'product'}
          onChange={() => setActiveFilter('product')}
        />
        <label htmlFor='product'>По названию</label>
      </fieldset>
      <fieldset>
        <input
          type='radio'
          name='filter'
          id='price'
          checked={activeFilter === 'price'}
          onChange={() => setActiveFilter('price')}
        />
        <label htmlFor='price'>По цене</label>
      </fieldset>
      <fieldset>
        <input
          type='text'
          placeholder='Введите параметры'
          value={activeParams}
          className={error ? 'search error__input' : 'search'}
          onChange={(e) => {
            setActiveParams(e.target.value);
            setError('');
          }}
        />
        <button onClick={submitForm} className='seacrh__button'>
          Поиск
        </button>
        <span className='error'>{error}</span>
      </fieldset>
    </form>
  );
}

export default Filters;
