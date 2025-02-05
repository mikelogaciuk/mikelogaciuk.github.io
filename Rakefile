# frozen_string_literal: true

desc 'Repo area'
namespace :repo do
  desc 'Publish changes'
  task :publish do
    system('git pull && git add . && git commit -m "New stuff" && git push')
  end
end
