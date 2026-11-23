import { describe, it, expect } from 'vitest';
import {
  getTeachersList,
  getTeacherResults,
  getTeacherStudents,
  getTeacherStudentQuestions,
  getQuizErrorAnalytics,
} from '@/services/teacherService';

describe('Teacher Service & Dashboard Functionality', () => {
  it('retrieves the catalog of available teachers and sections', async () => {
    const teachers = await getTeachersList();
    expect(teachers.length).toBeGreaterThanOrEqual(3);
    expect(teachers[0].id).toBe('docente-1');
    expect(teachers[0].name).toContain('Mendoza');
  });

  it('retrieves teacher section dashboard with anonymous cohort data', async () => {
    const dashboard = await getTeacherResults('docente-1');
    expect(dashboard.teacherName).toBe('Dr. Carlos Mendoza');
    expect(dashboard.section).toBe('Sección 1 (Cátedra A)');
    expect(dashboard.anonymousStudentCount).toBe(48);
    expect(dashboard.unitsStats.length).toBeGreaterThan(0);
  });

  it('retrieves students list with progress and support categories', async () => {
    const students = await getTeacherStudents();
    expect(students.length).toBeGreaterThanOrEqual(8);
    const supportNeeded = students.filter((s) => s.status === 'support_needed');
    expect(supportNeeded.length).toBeGreaterThan(0);
    expect(students[0].alias).toMatch(/Estudiante #\d+/);
    expect(students[0].recentQuizAttempts.length).toBeGreaterThan(0);
  });

  it('retrieves student questions and tracks pending vs answered', async () => {
    const questions = await getTeacherStudentQuestions();
    expect(questions.length).toBeGreaterThanOrEqual(4);
    const pending = questions.filter((q) => q.status === 'pending');
    const answered = questions.filter((q) => q.status === 'answered');
    expect(pending.length).toBeGreaterThan(0);
    expect(answered.length).toBeGreaterThan(0);
    expect(answered[0].teacherAnswer).toBeDefined();
  });

  it('retrieves quiz error analytics and pedagogical recommendations', async () => {
    const errorAnalytics = await getQuizErrorAnalytics();
    expect(errorAnalytics.length).toBeGreaterThanOrEqual(3);
    expect(errorAnalytics[0].failureRate).toBeGreaterThan(30);
    expect(errorAnalytics[0].mostChosenDistractor).toBeDefined();
    expect(errorAnalytics[0].pedagogicalRecommendation).toBeDefined();
  });
});
