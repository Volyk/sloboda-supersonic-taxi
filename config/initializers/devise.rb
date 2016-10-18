# Use this hook to configure devise mailer, warden hooks and so forth
Devise.setup do |config|
  # config.secret_key = '2983140bc23815c53f5e4e8cf97a61b0baca90363ae70657f825cebb807d2b793f8b5ed14d551769e8e24526e0efa9da12d213bd6a85ea4542becb93553b6a99'
  config.scoped_views = true # DO NOT DELETE!!!!!!
  config.mailer_sender = 'please-change-me-at-config-initializers-devise@example.com'
  require 'devise/orm/active_record'
  config.case_insensitive_keys = [:email]
  config.strip_whitespace_keys = [:email]
  config.stretches = Rails.env.test? ? 1 : 11
  config.reconfirmable = true
  config.expire_all_remember_me_on_sign_out = true
  config.password_length = 6..128
  config.email_regexp = /\A[^@\s]+@[^@\s]+\z/
  config.reset_password_within = 6.hours
  config.sign_out_via = :delete
end
