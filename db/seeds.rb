puts 'Removing previus data'
User.destroy_all
Favoritelocation.destroy_all

puts 'seeding users...'

User.create!([
    {
     username: 'liams',
    password: '123',
    email: 'liamsilva@hotmail.com',
    first_name: 'Liam',
    last_name: 'Silva'
    }
])

puts 'done seeding...'