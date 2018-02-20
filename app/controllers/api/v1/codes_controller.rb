class Api::V1::CodesController < ApplicationController
  def analyze
    code_1_results = []
    if params[:code] != ''
      code_1_results = CodeAnalyzer.new(params[:code]).results
    end

    code_2_results = []
    if params[:code2] != ''
      code_2_results = CodeAnalyzer.new(params[:code2]).results
    end

    render json: {results: code_1_results, results2: code_2_results}
  end
end
