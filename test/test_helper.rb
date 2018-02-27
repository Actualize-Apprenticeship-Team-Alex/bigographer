require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'minitest/pride'
Minitest::Reporters.use! [Minitest::Reporters::PrideReporter.new(color: true)]

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end
