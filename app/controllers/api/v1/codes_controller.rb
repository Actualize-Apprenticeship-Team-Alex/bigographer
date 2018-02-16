class Api::V1::CodesController < ApplicationController
  def analyze
    code_analyzer = CodeAnalyzer.new(params[:code])
    code_analyzer2 = CodeAnalyzer.new(params[:code2])

    results_hash = {results: code_analyzer.results} if params[:code]
    results_hash[:results2] = code_analyzer2.results if params[:code2]

    render json: results_hash
  end
end
