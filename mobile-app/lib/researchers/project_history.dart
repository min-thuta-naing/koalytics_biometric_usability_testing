import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        fontFamily: "Tommy", // Set the global font here
      ),
      home: ProjectHistoryScreen(),
    );
  }
}

class ProjectHistoryScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Project History',
          style: TextStyle(
            fontSize: 25,
            fontFamily: "Tommy",
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ProjectHistoryList(),
      ),
    );
  }
}

class ProjectHistoryList extends StatelessWidget {
  final List<ProjectHistory> projects = [
    ProjectHistory(
      projectName: 'Biometric Usability Testing',
      description: 'Analyzing biometric data to test the usability of an LMS.',
      startDate: DateTime(2024, 11, 01),
      endDate: DateTime(2025, 02, 09),
      milestones: [
        'Setup and Planning',
        'SUS Survey Collection',
        'Biometric Data Collection',
        'Data Analysis',
        'Reporting',
      ],
    ),
    ProjectHistory(
      projectName: 'LMS Usability Study',
      description: 'Study to evaluate the usability of the university LMS system.',
      startDate: DateTime(2023, 05, 15),
      endDate: DateTime(2023, 11, 30),
      milestones: [
        'Survey Distribution',
        'Data Collection',
        'Results Analysis',
        'Final Report',
      ],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: projects.length,
      itemBuilder: (context, index) {
        final project = projects[index];
        return Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          color: Color.fromARGB(255, 235, 238, 250),
          margin: EdgeInsets.symmetric(vertical: 8.0),
          child: ListTile(
            title: Text(
              project.projectName,
              style: TextStyle(
                fontSize: 18,
                fontFamily: "Tommy",
                fontWeight: FontWeight.bold,
              ),
            ),
            subtitle: Text(
              project.description,
              style: TextStyle(
                fontSize: 15,
                fontFamily: "Tommy",
                fontWeight: FontWeight.bold,
              ),
            ),
            trailing: Text(
              '${project.projectDurationInDays()} days',
              style: TextStyle(
                fontSize: 15,
                fontFamily: "Tommy",
                fontWeight: FontWeight.bold,
              ),
            ),
            onTap: () {
              showDialog(
                context: context,
                builder: (_) => ProjectDetailDialog(project: project),
              );
            },
          ),
        );
      },
    );
  }
}

class ProjectHistory {
  final String projectName;
  final String description;
  final DateTime startDate;
  final DateTime endDate;
  final List<String> milestones;

  ProjectHistory({
    required this.projectName,
    required this.description,
    required this.startDate,
    required this.endDate,
    required this.milestones,
  });

  int projectDurationInDays() {
    return endDate.difference(startDate).inDays;
  }
}

class ProjectDetailDialog extends StatelessWidget {
  final ProjectHistory project;

  ProjectDetailDialog({required this.project});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(
        project.projectName,
        style: TextStyle(
          fontSize: 18,
          fontFamily: "Tommy",
          fontWeight: FontWeight.bold,
        ),
      ),
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            'Description: ${project.description}',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16,
              fontFamily: "Tommy",
            ),
          ),
          SizedBox(height: 8.0),
          Text(
            'Duration: ${project.projectDurationInDays()} days',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16,
              fontFamily: "Tommy",
            ),
          ),
          SizedBox(height: 8.0),
          Text(
            'Milestones:',
            style: TextStyle(
              fontSize: 16,
              fontFamily: "Tommy",
            ),
          ),
          for (var milestone in project.milestones)
            Text(
              '- $milestone',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 16,
                fontFamily: "Tommy",
              ),
            ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: Text(
            'Close',
            style: TextStyle(
              fontFamily: "Tommy",
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ],
    );
  }
}
