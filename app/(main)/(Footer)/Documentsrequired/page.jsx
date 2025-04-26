import React from "react";
import { FaUserTie, FaUser, FaUserGraduate } from "react-icons/fa";
import { SiFreelancer } from "react-icons/si";

// Configuration for document types
const documentTypes = [
  {
    title: "Working Professional",
    icon: (
      <FaUserTie
        className="h-10 w-10 text-theme"
        aria-label="Working Professional"
      />
    ),
    mandatoryDocs: [
      "Pan Card",
      "Selfie",
      "Company name and Official Email id",
      "Aadhar Card",
      "Voter Card",
    ],
    additionalDocs: null,
  },
  {
    title: "Self Employed",
    icon: (
      <FaUser className="h-10 w-10 text-theme" aria-label="Self Employed" />
    ),
    mandatoryDocs: [
      "Pan Card",
      "Selfie",
      "GST number",
      "Aadhar Card",
      "Voter Card",
    ],
    additionalDocs: null,
  },
  {
    title: "Freelancer",
    icon: (
      <SiFreelancer className="h-10 w-10 text-theme" aria-label="Freelance" />
    ),
    mandatoryDocs: [
      "Pan Card",
      "Selfie",
      "Bank statement",
      "Aadhar Card",
      "Voter Card",
    ],
    additionalDocs: null,
  },
  {
    title: "Students",
    icon: (
      <FaUserGraduate className="h-10 w-10 text-theme" aria-label="Students" />
    ),
    mandatoryDocs: [
      "Govt id card",
      "Profile pic",
      "Bank statement",
      "College name",
      "Aadhar Card",
      "Voter Card",
    ],
    additionalDocs: ["Parents Bank Statement", "Parents Govt id"],
  },
];

// Reusable DocumentCard Component
const DocumentCard = ({ title, icon, mandatoryDocs, additionalDocs }) => {
  return (
    <div className="flex flex-col w-full  p-5 rounded-3xl border lg:border-none lg:shadow-lg">
      <div className="relative flex flex-col justify-center items-center mb-4">
        {icon}
        <span className="whitespace-nowrap text-lg font-recline">{title}</span>
      </div>
      <h3 className="text-sm  font-semibold mb-2">Mandatory Documents:</h3>
      <ol className="list-disc list-inside space-y-1 mb-4">
        {mandatoryDocs.map((doc, index) => (
          <li key={index} className="text-sm  text-gray-700">
            📄 {doc}
          </li>
        ))}
      </ol>
      {additionalDocs && (
        <>
          <h3 className="text-sm  font-semibold mb-2">Additional Documents:</h3>
          <p className="text-xs text-gray-600 mb-2">
            We might also ask for the following docs in some cases:
          </p>
          <ol className="list-disc list-inside space-y-1 mb-4">
            {additionalDocs.map((doc, index) => (
              <li key={index} className="text-sm  text-gray-700">
                📄 {doc}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

// Main Page Component
function Page() {
  return (
    <div className="min-h-screen pb-10">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-theme py-5 font-recline">
        Documents Required
      </h1>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {documentTypes.map((type, index) => (
            <DocumentCard
              key={index}
              title={type.title}
              icon={type.icon}
              mandatoryDocs={type.mandatoryDocs}
              additionalDocs={type.additionalDocs}
            />
          ))}
        </div>
      </div>
      <div className="text-xs text-gray-600 mt-10 text-center max-w-2xl mx-auto px-5">
        <span className="font-semibold text-theme">Note:</span> While we
        appreciate you sharing your documents, please note that Rentbean.in
        reserves the right to confirm or decline the order on a case-by-case
        basis.
      </div>
    </div>
  );
}

export default Page;
