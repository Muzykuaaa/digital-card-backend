-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "techStack" TEXT[];

-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "category" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "experience_profileId_company_position_key" ON "experience"("profileId", "company", "position");

-- CreateIndex
CREATE UNIQUE INDEX "links_profileId_label_url_key" ON "links"("profileId", "label", "url");

-- CreateIndex
CREATE UNIQUE INDEX "projects_profileId_name_key" ON "projects"("profileId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "skills_profileId_name_key" ON "skills"("profileId", "name");
