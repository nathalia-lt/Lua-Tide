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

Favoritelocation.create!([
    {
        user_id: 1,
        city: 'Ungana Bay, Quebec',
        latitude: '59.8068',
        longitude: '67.7243',
    },
    {
        user_id: 1,
        city: 'Bristol Channel, Uk',
        latitude: '51.3564',
        longitude: '4.1845',
    },
    {
        user_id: 1,
        city: 'Cook Inlet, Alaska',
        latitude: '59.3722',
        longitude: '152.6440',
    },
    {
        user_id: 1,
        city: 'Mont Saint-Michel, France',
        latitude: '48.6361',
        longitude: '1.5115',
    },
    {
        user_id: 1,
        city: 'Derby, Australia',
        latitude: '17.3093',
        longitude: '123.6402',
    },
])

puts 'done seeding...'