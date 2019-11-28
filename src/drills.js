const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: 'postgresql://dunder_mifflin:foobar@localhost/knex-practice'
})

function searchList(searchTerm) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => console.log(result))
}

searchList('chili')

function paginateList(pageNumber) {
  const itemsPerPage = 6
  const offset = itemsPerPage * (pageNumber - 1)
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => console.log(result))
}

paginateList(2)

function itemsAfterDaysAgo(daysAgo) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(result => console.log(result))
}

itemsAfterDaysAgo(5)

function totalCost() {
  knexInstance
    .select('category')
    .sum('price AS totalCost')
    .from('shopping_list')
    .groupBy('category')
    .then(result => console.log(result))
}

totalCost()