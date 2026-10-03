<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project architecture

- Keep the public website as one anchored bilingual route because its primary journey is a fast mobile enquiry flow.
- Submit public leads only through a validated server function using privileged database access; never expose stored enquiries to visitors.
- Keep all English and Telugu marketing copy co-located in the website module so language switching remains complete and consistent.
