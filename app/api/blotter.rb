class Blotter < Grape::API
  format :json

  get :incidents do
    present Incident.in_range(params[:startDate], params[:startTime], params[:endDate], params[:endTime]),
            with: IncidentEntity
  end

  get :aggregates do
    present Charge.aggregate_over(params[:startDate], params[:startTime], params[:endDate], params[:endTime]),
            with: AggregateEntity
  end
end
