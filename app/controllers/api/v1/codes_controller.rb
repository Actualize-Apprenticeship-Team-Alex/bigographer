class Api::V1::CodesController < ApplicationController
  def analyze
    code_blocks = []
    code_blocks << params["1"]
    code_blocks << params["2"]

    results = code_blocks.map do |code|
      CodeAnalyzer.new(code).results
    end

    render json: results
  end
end
