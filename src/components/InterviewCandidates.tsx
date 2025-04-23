import React, { FC } from 'react';
import { Candidate } from '../types/Candidate';

interface InterviewCandidatesProps {
  candidates: Candidate[];
}

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const ActionButton: FC<ActionButtonProps> = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-white ${className}`}
  >
    {children}
  </button>
);

const InterviewCandidates: FC<InterviewCandidatesProps> = ({ candidates }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Interview Candidates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{candidate.name}</h2>
            <p className="text-gray-600 mb-2">{candidate.position}</p>
            <p className="text-gray-600 mb-4">{candidate.experience} years experience</p>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Education:</span> {candidate.education}
            </p>
            <div className="flex gap-4">
              <ActionButton
                onClick={() => {/* Handle accept */}}
                className="bg-green-500 hover:bg-green-600"
              >
                Accept
              </ActionButton>
              <ActionButton
                onClick={() => {/* Handle reject */}}
                className="bg-red-500 hover:bg-red-600"
              >
                Reject
              </ActionButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewCandidates; 