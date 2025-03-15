// "use client";
// import FormTrigger from "@/components/education/formTrigger";
// import PublicationForm from "@/components/resume-form/publication-form";
// import SectionCard from "@/components/section-card";
// import SectionHeading from "@/components/section-heading";
// import { Separator } from "@/components/ui/separator";
// import { Publication as PublicationType } from "@/constants/types";
// import useResumeStore from "@/store/resumeStore";
// import { useState } from "react";

// const Publication = ({ isLast = false }: { isLast: boolean | undefined }) => {
//   const publications = useResumeStore((state) => state.publications);
//   const deletePublication = useResumeStore((state) => state.deletePublication);
//   const setPublication = useResumeStore((state) => state.setPublications);
//   const updatePublication = useResumeStore((state) => state.updatePublication);
//   const [isPublicationFormOpen, setIsPublicationFormOpen] = useState(false);
//   const [selectedPublication, setSelectedPublication] = useState<string | null>(
//     null
//   );
//   let defaultVal: PublicationType = {
//     publicationId: "",
//     publicationName: "",
//     publicationDate: "",
//     publicationDescription: "",
//     publicationLink: "",
//     publicationPublisher: "",
//     resumeIdentifier: "",
//   };

//   if (selectedPublication) {
//     defaultVal = publications.find(
//       (publication) => publication.publicationId === selectedPublication
//     )!;
//   }

//   return (
//     <section className="flex flex-col gap-6 w-full">
//       <SectionHeading title="Publication" icon="publication" />

//       {publications.length > 0 && (
//         <div className="space-y-3">
//           {publications.map((publication) => (
//             <SectionCard
//               key={publication.publicationId}
//               id={publication.publicationId}
//               onDelete={deletePublication}
//               primaryHeading={publication.publicationName}
//               secondaryHeading={publication.publicationPublisher || ""}
//               setIsEducationFormOpen={setIsPublicationFormOpen}
//               setSelectedEducation={setSelectedPublication}
//             />
//           ))}
//         </div>
//       )}

//       <PublicationForm
//         isOpened={isPublicationFormOpen}
//         setIsOpened={setIsPublicationFormOpen}
//         selectedPublication={selectedPublication}
//         onCreate={setPublication}
//         onEdit={updatePublication}
//         mode={selectedPublication ? "edit" : "create"}
//         defaultVal={defaultVal}
//       />
//       <FormTrigger
//         setIsOpened={setIsPublicationFormOpen}
//         setSelectedEducation={setSelectedPublication}
//       />
//       {!isLast && <Separator />}
//     </section>
//   );
// };

// export default Publication;
