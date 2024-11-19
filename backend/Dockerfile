# Step 1: Use an official OpenJDK image as a base
FROM openjdk:17-jdk-slim

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the application JAR file into the container
COPY target/poker_traker-0.0.1-SNAPSHOT.jar app.jar

# Step 4: Expose the application port
EXPOSE 8080

# Step 5: Set environment variables for PostgreSQL
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/pokertracker
ENV SPRING_DATASOURCE_USERNAME=cxz2286
ENV SPRING_DATASOURCE_PASSWORD=cuixianze123

# Step 6: Define the entrypoint command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
