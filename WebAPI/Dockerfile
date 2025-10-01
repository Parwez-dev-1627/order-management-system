# Use official .NET SDK image for build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY WebAPI/*.csproj ./WebAPI/
RUN dotnet restore ./WebAPI/WebAPI.csproj

# Copy everything else and build
COPY . ./
WORKDIR /app/WebAPI
RUN dotnet publish WebAPI.csproj -c Release -o out

# Use official .NET runtime image for deployment
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/WebAPI/out ./

# Expose port 80
EXPOSE 80

# Set environment variables if needed
# ENV ASPNETCORE_ENVIRONMENT=Production

# Start the API
ENTRYPOINT ["dotnet", "WebAPI.dll"]
