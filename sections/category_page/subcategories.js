import CategoryCard from '../../components/category_card';

import './styles/subcategories.scss';

export default function Subcategories(props) {
  return (
    <section className="subcategories" style={{margin: '20px'}}>
      <ul className="subcategories__list" style={{display: 'flex', justifyContent: 'space-around'}}>
        {props.subcategories.map((category, index)=> {              
          return (
            <li className="" key={category.id} style={{display: 'block'}}>
              <CategoryCard category={category} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
