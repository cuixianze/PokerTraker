# 1. Use an official JDK runtime as a parent image
FROM openjdk:17-jdk-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy the JAR file into the container
COPY target/poker_traker-0.0.1-SNAPSHOT.jar app.jar

# 4. Expose the port your Spring Boot app runs on (e.g., 8080)
EXPOSE 8080

# 5. Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
