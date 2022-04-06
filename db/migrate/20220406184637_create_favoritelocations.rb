class CreateFavoritelocations < ActiveRecord::Migration[6.1]
  def change
    create_table :favoritelocations do |t|
      t.references :user, null: false, foreign_key: true
      t.string :city
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
