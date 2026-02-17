#!/usr/bin/env ruby
# frozen_string_literal: true

require "set"
require "yaml"

THEMES_PATH = File.expand_path("../_data/theme/themes.yml", __dir__)
README_PATH = File.expand_path("../_data/theme/README.md", __dir__)
REQUIRED_KEYS = %w[
  accent
  accent_rgb
  accent_hover
  accent_orange
  bg_accent
  bg_accent_hover
  info_text
  info_bg
  info_bg_hover
].freeze

def hex_to_rgb(hex)
  raw = hex.delete("#")
  [raw[0, 2], raw[2, 2], raw[4, 2]].map { |pair| pair.to_i(16) }
end

def valid_hex?(value)
  /\A#[0-9A-Fa-f]{6}\z/.match?(value)
end

def parse_readme_theme_ids(path)
  ids = Set.new
  File.foreach(path) do |line|
    next unless line.include?("| `")

    parts = line.split("|")
    next if parts.length < 4

    id = parts[2].to_s.strip.gsub("`", "")
    ids << id unless id.empty?
  end
  ids
end

themes = YAML.load_file(THEMES_PATH)
errors = []

themes.each do |theme_id, theme_data|
  %w[light dark].each do |mode|
    mode_data = theme_data[mode]
    if mode_data.nil?
      errors << "#{theme_id}.#{mode}: missing mode block"
      next
    end

    REQUIRED_KEYS.each do |key|
      errors << "#{theme_id}.#{mode}.#{key}: missing" unless mode_data.key?(key)
    end

    next unless mode_data["accent"] && mode_data["accent_rgb"]

    accent = mode_data["accent"]
    rgb = mode_data["accent_rgb"]
    unless valid_hex?(accent)
      errors << "#{theme_id}.#{mode}.accent: invalid hex '#{accent}'"
      next
    end

    expected_rgb = hex_to_rgb(accent).join(", ")
    if rgb != expected_rgb
      errors << "#{theme_id}.#{mode}.accent_rgb: '#{rgb}' should be '#{expected_rgb}' for accent #{accent}"
    end
  end
end

theme_ids = themes.keys.to_set
readme_ids = parse_readme_theme_ids(README_PATH)

missing_from_readme = theme_ids - readme_ids
missing_from_yaml = readme_ids - theme_ids

missing_from_readme.sort.each { |id| errors << "README missing theme id '#{id}'" }
missing_from_yaml.sort.each { |id| errors << "README includes unknown theme id '#{id}'" }

if errors.empty?
  puts "Theme validation passed: #{themes.length} themes, README coverage OK, accent_rgb values consistent."
  exit 0
end

puts "Theme validation failed:"
errors.each { |err| puts "- #{err}" }
exit 1
