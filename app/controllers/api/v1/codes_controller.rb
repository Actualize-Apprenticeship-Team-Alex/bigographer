class Api::V1::CodesController < ApplicationController
  def analyze
    code_analyzer = CodeAnalyzer.new(params[:code])
    code_analyzer2 = CodeAnalyzer.new(params[:code2])
    puts code_analyzer
    render json: {results: code_analyzer.results , results2: code_analyzer2.results}
  end
end
