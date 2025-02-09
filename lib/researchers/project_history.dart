import 'package:flutter/material.dart';

class ProjectHistoryScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Project History'),
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
          margin: EdgeInsets.symmetric(vertical: 8.0),
          child: ListTile(
            title: Text(project.projectName),
            subtitle: Text(project.description),
            trailing: Text('${project.projectDurationInDays()} days'),
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

  // Calculate project duration in days
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
      title: Text(project.projectName),
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('Description: ${project.description}'),
          SizedBox(height: 8.0),
          Text('Duration: ${project.projectDurationInDays()} days'),
          SizedBox(height: 8.0),
          Text('Milestones:'),
          for (var milestone in project.milestones) Text('- $milestone'),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: Text('Close'),
        ),
      ],
    );
  }
}
