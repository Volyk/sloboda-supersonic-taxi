# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

  Admin.where(login: 'admin').first_or_create do |state|
    state.password = 'admin'
    state.active = true
  end


  Admin.where(login: 'god').first_or_create do |state|
    state.password = 'admin'
    state.active = true
  end

  Admin.where(login: 'power').first_or_create do |state|
    state.password = 'admin'
    state.active = false
  end

  Admin.where(login: 'user').first_or_create do |state|
    state.password = 'admin'
    state.active = true
  end

  Admin.where(login: 'gentelwoman').first_or_create do |state|
    state.password = 'admin'
    state.active = false
  end



  Driver.where(number: '0509805135').first_or_create do |state|
    state.password = 'driver'
    state.active = true
  end

  Driver.where(number: '0509805136').first_or_create do |state|
    state.password = 'driver'
    state.active = true
  end

  Driver.where(number: '0509805137').first_or_create do |state|
    state.password = 'driver'
    state.active = false
  end

  Driver.where(number: '0509805138').first_or_create do |state|
    state.password = 'driver'
    state.active = true
  end


