require 'test_helper'

class Api::V1::CodesControllerTest < ActionDispatch::IntegrationTest
  test "Submitting code should return http status code of 200" do
    post "/api/v1/code", params: {"1" => "", "2" => ""}
    assert_response 200
  end

  test "Submitting code should return a json response" do
    post "/api/v1/code", params: {"1" => "", "2" => ""}
    assert_equal response.content_type, 'application/json'
  end

  test "Submitting one code block doesn't break" do
    post "/api/v1/code", params: {"1" => "", "2" => ""}
    data = JSON.parse(response.body)
    assert_equal response.status, 200
  end

  test "Submitting empty code should return json hash containing the results of an empty array" do
    post "/api/v1/code", params: {"1" => "", "2" => ""}
    data = JSON.parse(response.body)
    assert_equal data, [[], []]
  end

  test "Submitting actual code should return json hash containing the results of x, y coordinates" do
    post "/api/v1/code", params: {"1" => "[*].each do |number|\nnumber\nend", "2" => ""}
    data = JSON.parse(response.body)
    assert_equal data,[
      [
        {"x"=>100, "y"=>201},
        {"x"=>500, "y"=>1001},
        {"x"=>1000, "y"=>2001},
        {"x"=>1500, "y"=>3001},
        {"x"=>2000, "y"=>4001},
        {"x"=>2500, "y"=>5001},
        {"x"=>3000, "y"=>6001}
      ], []]
  end

end
