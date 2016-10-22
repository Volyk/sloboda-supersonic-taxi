class AddDefaultsToDrivers < ActiveRecord::Migration[5.0]
  def change
    change_column :drivers, :passengers, :string, default: 0
    change_column :drivers, :trunk, :string, default: 0
  end
end
