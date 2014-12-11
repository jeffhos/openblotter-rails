class Incident < ActiveRecord::Base
  self.primary_key = 'incidentid'
  self.table_name = 'incident'
  ignore_columns :geom

  has_many :charges, :foreign_key => 'incidentid'

  def self.in_range(start_date, start_time, end_date, end_time)
    where(incidentdate: start_date .. end_date).where(incidenttime: start_time .. end_time).includes(:charges)
  end
end
