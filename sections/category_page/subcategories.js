import CategoryCard from '../../components/category_card';

import './styles/subcategories.scss';

export default function Subcategories(props) {
  return (
    <section className="subcategories">
      <ul className="subcategories__list">
        {props.subcategories.map((category, index)=> {              
          return (
            <li className="subcategories__list-item" key={category.id}>
              <CategoryCard category={category} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
