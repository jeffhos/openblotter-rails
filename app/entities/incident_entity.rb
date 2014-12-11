class IncidentEntity < Grape::Entity
  format_with(:friendly_timestamp) {|dt| dt.strftime("%l:%M %P")}

  expose :incidenttype, as: :type
  expose :incidentdate, as: :date
  expose :incidenttime, as: :time, format_with: :friendly_timestamp
  expose :address
  expose :neighborhood
  expose :lat
  expose :lng
  expose :zone
  expose :age
  expose :gender
  expose :charges, with: ChargeEntity
end
