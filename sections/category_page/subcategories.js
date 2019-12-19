<ul className="">
  {props.categories.map((category, index)=> {              
    return (
      <li className="" key={category.id}>
        <CategoryCard product={product} />
      </li>
    );
  })}
</ul>