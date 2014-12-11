class Charge < ActiveRecord::Base
  self.primary_key = 'incidentdescriptionid'
  self.table_name = 'incidentdescription'

  belongs_to :incident, :foreign_key => 'incidentid'

  def self.aggregate_over(start_date, start_time, end_date, end_time)
    joins(:incident).select('incidentdescription.description as description')
                    .select('COUNT(incidentdescription.incidentdescriptionid) as total')
                    .where('incident.incidentdate' => start_date .. end_date)
                    .where('incident.incidenttime' => start_time .. end_time)
                    .group('incidentdescription.description')
                    .order('total DESC')
  end
end
