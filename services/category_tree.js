import wooApi from './woo_api';

const getCategoryTree = async () => {
  //Fetch all categories from the Database.
  const {data: categories} = await wooApi.get(`products/categories`);
  let ftCategory, ftCategoryTree;

  //id name slug parent description display image menu_order count

  //Create an array with relevant data for each category
  let categoryList = categories.map((category)=> {
    //env replaced at build time. Do not extract with destructuring.
    const firstMatch = process.env.FEATURED_CATEGORY_ID == category.id;
    if (firstMatch)
      ftCategory = category;

    return [
      category.name,
      `/categories/${category.slug}_${category.id}`,
      [],
    ];
  });

  //Loop over the array and build the subcategory tree for each element.
  categoryList.forEach((catListItem, catListIndex)=> {
    if (!catListItem) return;

    buildList(catListIndex);
  })

  function buildList(index) {
    //Get the id of the current category.
    const id = categories[index].id;

    //Iterate over the array of objects gotten from the database, retrieving the parent id for each member.
    categories.forEach((category, i)=> {
      //If you found a child of the current category being built...
      if (category && category.parent === id) { //Null check for category is important because of deletion of processed items.
        //Build the subtree for this subcategory first.
        buildList(i);

        //Then push the subcategory and it's entire subtree into the current parent.
        categoryList[index][2].push(categoryList[i]);

        //Now delete the subcategory that has been processed from both arrays, to prevent conflict on future iterations.
        categories[i] = null;
        categoryList[i] = null;
      }
    });

    //If this is the featured category, save it's subtree separately.
    const secondMatch = id == process.env.FEATURED_CATEGORY_ID;
    if (secondMatch)
      ftCategoryTree = categoryList[index];
  };

  //Filter category list to remove all null elements.
  //Only root categories and their nested subtrees will be left.
  const categoryTree = categoryList.filter((rootCategory)=> rootCategory ? true : false);

  //categoryTree.prototype.FEATURED_CATEGORY = {
  //categoryTree.__proto__.FEATURED_CATEGORY = {
  categoryTree.FEATURED_CATEGORY = {
    obj: ftCategory,
    tree: ftCategoryTree,
  };

  return categoryTree;
};

export default getCategoryTree;

/*const categoryTree = [
    ['Servers', 'link/1', [
      ['Rack Servers', 'link/2'],
      ['Tower Servers', 'Link/3'],
      ['Blade Servers', 'Link/4'],
    ]],
    ['Accessories', 'Link/5', [
      ['Memory', 'link/6'],
      ['Power Supplies', 'link/7'],
      ['Hard Drives', 'link/8'],
      ['Processors', 'link/9'],
      ['Controllers', 'link/10'],
      ['Adapters', 'link/11'],
      ['Rail Kits', 'link/12'],
      ['Cables', 'link/13'],
      ['Others', 'link/14'],
    ]],
    ['HPE Networking', 'link/15', [
      ['Networking Attached Storage', 'link/16'],
      ['MSA', 'link/17'],
      ['Tape Drives', 'link/18'],
    ]],
  ];*/
