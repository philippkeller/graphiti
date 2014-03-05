require './graphiti'
class Rack::Protection::FrameOptions
  def header
    @header ||= {}
  end
end
run Graphiti
